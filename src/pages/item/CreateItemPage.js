import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';
import { ItemCreateComponent } from '../../components/items/ItemCreateComponent';
import { getCategoriesWithItems } from '../../services/category.service';
import { messageBoxType } from '../../utilities/native.utility';
import { CreateCategoryComponent } from '../../components/category/CreateCategoryComponent';
import { CategoryListTableComponent } from '../../components/category/CategoryListTableComponent';
import { BiCategory } from "react-icons/bi";
import { Card } from 'react-bootstrap';
import { DeleteDialog } from '../../components/general/deleteDialog';
import { CategoryChart } from '../../components/category/CategoryChart';

class CreateItemPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      categoriesTotal : 0
    }
  }

  async loadingCategory() {
    const categoryResponse = await getCategoriesWithItems();
    console.log(categoryResponse)
    if (categoryResponse && categoryResponse.success === false) {
      window.nativeApi.messageBox.open({ title: t('response-error'), message: categoryResponse.message, type: messageBoxType.info });
      return;
    }

    categoryResponse.map((value) => {
      value.total_item = value.item.length;
      return value;
    });

    this.setState({
      categoriesList: categoryResponse,
      categoriesTotal : categoryResponse.length
    });
  }

  componentDidMount() {
    const { history } = this.props;

    window.nativeApi.app.navigateTo((url) => {
      history.push(url);
    });

    this.loadingCategory();
  }

  render() {
    const { lang, delModal } = this.props.reducer;

    return (
      <div className='container-fluid'>
        <div className='row mt-1'>
          <div className='col-md-3'>
            <ItemCreateComponent categoriesList={this.state.categoriesList} />
          </div>

          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-6'>
                <CreateCategoryComponent reload={() => this.loadingCategory()} />
              </div>

              <div className='col-md-6 mt-3'>
                {/* <Card>
                  <Card.Header className='card-success'>
                    <Card.Title className={`title-secondary ${zawgyi(lang)}`}> {t('total-categories')} </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                      <BiCategory size={50} color="#4E8D28" />
                      <label className='label-count'> {this.state.categoriesTotal}  </label>
                    </div>
                  </Card.Body>
                </Card> */}
                <CategoryChart categories ={this.state.categoriesList} />
              </div>

              <div className='col-md-12'>
                <CategoryListTableComponent 
                  dataSource={this.state.categoriesList} 
                  reload={() => this.loadingCategory()} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          {delModal && (
            <DeleteDialog retrive={() => this.loadingCategory()} />
          )}
        </div>
      </div>
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
)(withRouter(CreateItemPage));
