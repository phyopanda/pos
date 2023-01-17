import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Language } from "../../components/general/Language";
import { getShop } from "../../services/shop.service";
import PrintSetting from "./PrintSetting";
import { ShopSettingCreate } from "./ShopSettingCreate";
import { ShopSettingEdit } from "./ShopSettingEdit";
import TaxSetting from "./TaxSetting";
import ShowDeviceSetting from "./ShowDeviceSetting";
import ProfileSetting from "./ProfileSetting";
import InvoiceSetting from "./InvoiceSetting";

class GeneralSettingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shop: null,
        }
    }

    getShopInfo(e) {
        this.setState({
            shop: e,
        });
    }

    async loadingData() {
        const response = await getShop();
        console.log(response);

        if (response) {
            this.setState({
                shop: response
            });
        }
    }

    async componentDidMount() {
        const { history } = this.props;
        await this.loadingData();

        window.nativeApi.app.navigateTo((url) => {
            history.push(url);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-1">
                    <div className="col-md-6 mb-3">

                        <div className="row">
                            <div className="col-md-12">
                                <ShowDeviceSetting />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <PrintSetting />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <Language />
                            </div>

                            <div className="col-md-6">
                                <TaxSetting />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <ProfileSetting />
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className="col-md-12">
                                    {
                                        this.state.shop === null ? (<ShopSettingCreate props={this.props} retrive={e => this.getShopInfo(e)} />)
                                            : (<ShopSettingEdit props={this.props} dataSource={this.state.shop} retrive={e => this.getShopInfo(e)} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <InvoiceSetting />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GeneralSettingPage));
