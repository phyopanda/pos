
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ItemListTableComponent } from '../components/items/ItemListTableComponent';
import { getItems } from '../services/item.service';
import { t, zawgyi } from '../utilities/translation.utility';
import { messageBoxType } from '../utilities/native.utility';
import { Card } from 'react-bootstrap';
import { BsServer, BsGraphDown, BsGraphUp, BsCurrencyDollar } from "react-icons/bs";
import numeral from 'numeral';
import { DeleteDialog } from '../components/general/deleteDialog';

class InventoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openEdit : false,
            items: [],
            counts : {
                items: 0,
                outStock: 0,
                revenue: 0,
                purchese: 0
            }
        }
    }

    async loadingItem() {
        const getItemData = await getItems();
        if(getItemData && getItemData.success === false) {
            window.nativeApi.messageBox.open({ title: t('network-error'), message: getItemData.message, type: messageBoxType.info});
            return;
        }

        getItemData.map((value) => {
            value.percentage = parseInt(value.percentage);
            value.price = parseInt(value.price);
            value.total_purchase = value.qty * value.price;
            value.sell_price = ((value.price * value.percentage) / 100) + value.price;
            value.total_sell_price = value.sell_price * value.qty;
            value.profit = value.sell_price - value.price;
            value.total_profit = value.profit * value.qty;
            return value;
        });

        const getItemsCount = getItemData.map(value => value.qty);
        const getRevenue = getItemData.map(value => value.total_profit);
        const getPurchese = getItemData.map(value => value.total_sell_price);

        const counts = {
            items: getItemsCount.length > 0 ? getItemsCount.reduce((a,b) => a+b) : 0,
            outStock: getItemData.length > 0 ? getItemData.filter(value => value.qty === 0 || value.qty === '').length : 0,
            revenue: getRevenue.length > 0 ? getRevenue.reduce((a,b) => a+b) : 0,
            purchese: getPurchese.length > 0 ? getPurchese.reduce((a,b) => a+b) : 0
        }

        this.setState({
            items: getItemData,
            counts: counts
        });
    }

    async componentDidMount() { 
        const { history } = this.props;

        window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });

        await this.loadingItem();
    }
    
    render() {
        const { items, openCreateItem, counts } = this.state;
        const { lang } = this.props.reducer;
        const { delModal } = this.props.reducer;
       
        return(
            <>
                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-md-3'>
                            <Card>
                                <Card.Header className='card-success'>
                                    <Card.Title className={`${zawgyi(lang)}`}> {t('total-item-count')} </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                        <BsServer size={50} color="#4E8D28" />
                                        <label className='label-count'> {numeral(counts.items).format('0,0')} </label>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-3'>
                            <Card>
                                <Card.Header className='card-danger'>
                                    <Card.Title className={`${zawgyi(lang)}`}> {t('total-out-stock-count')} </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                        <BsGraphDown size={50} color="red" />
                                        <label className='label-count'> {numeral(counts.outStock).format('0,0')} </label>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-3'>
                            <Card>
                                <Card.Header className='card-info'>
                                    <Card.Title className={`${zawgyi(lang)}`}> {t('total-revenue')} </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                        <BsGraphUp size={50} color="#1dc6e0" />
                                        <label className={`label-count ${zawgyi(lang)}`}> {`${numeral(counts.revenue).format('0,0')} ${t('mmk')}`} </label>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-3'>
                            <Card>
                                <Card.Header className='card-warm'>
                                    <Card.Title className={`${zawgyi(lang)}`}> {t('total-purchese')} </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                        <BsCurrencyDollar size={50} color="#ffd314" />
                                        <label className={`label-count ${zawgyi(lang)}`}> {`${numeral(counts.purchese).format('0,0')} ${t('mmk')}`} </label>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12">
                            <ItemListTableComponent 
                                props={this.props} 
                                dataSource={items} 
                                reload={(e) => this.loadingItem()} 
                                openCreateItem={openCreateItem}                             
                                open={(e) => this.setState({
                                    openCreateItem: e
                                })}
                            />
                        </div>
                    </div>

                   { delModal && (
                       <DeleteDialog props={this.props} retrive={() => this.loadingItem()}/>
                   )} 
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(InventoryPage));
