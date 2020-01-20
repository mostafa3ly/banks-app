import React, { Component } from 'react';
import axios from 'axios';
import classes from './Vendors.module.css'
import Header from './Header/Header';
import Vendor from '../../components/Vendor/Vendor'
import Loader from '../../components/UI/Loader/Loader';
import FadeIn from '../../components/UI/FadeIn/FadeIn';

class Vendors extends Component {

    state = {
        bank: {
            logo: "",
            name: "",
            vendors_link: "",
            vendors: null
        },
        loading: true,
        error: false
    };

    componentDidMount() {
        axios.post('/vendors', { bank: this.props.match.params.id }).then((response) => {
            const data = response.data;
            this.setState({
                bank: {
                    logo: data.vendors.logo_en,
                    name: data.vendors.name_ar,
                    vendors_link: data.vendors.vendors_link,
                    vendors: data.vendors._vendors
                },
                loading: false,
                error: false
            })
        }).catch(error => {
            this.setState({ error: true, loading: false })
        });
    }


    getVendorsList = () => {
        return this.state.bank.vendors.map((vendor, index) => {
            return <Vendor name={vendor.name_en}
                logo={vendor.vendor_photo}
                link={vendor.vendor_link}
                key={vendor._id} />
        });
    }

    render() {
        let vendors = this.state.error ? <h1 className="text-center">Not found</h1> : <Loader />;
        if (this.state.bank.vendors) {
            const vendorsList = this.getVendorsList();
            vendors = (
                <FadeIn>
                    <header className="container">
                        <Header logo={this.state.bank.logo}
                            name={this.state.bank.name}
                        />
                    </header>
                    <div className={`container ${classes.vendors}`} >
                        {vendorsList}
                    </div>
                    <footer>
                        <a className={`btn ${classes.more}`} target="_blank" rel="noopener noreferrer" 
                        href={this.state.bank.vendors_link}>إعرف تفاصيل أكتر</a>
                    </footer>
                </FadeIn>
            );
        }
        return vendors;
    }

}

export default Vendors;