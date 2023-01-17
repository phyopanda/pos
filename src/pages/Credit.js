import React, { Component } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreditDetailComponent } from "../components/credit/CreditDetailComponent";
import { CreditTableComponent } from "../components/credit/CreditTableComponent";
import { Navigation } from "../components/general/Navigation";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { getCreditList, updateCredit } from "../services/credit.service";
import moment from "moment";
import { t } from 'i18next';

class CreditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditDetail: null,
      credits: [],
      openAddRepayment: false,
      credit_id: null,
      repayment_amount: '',
      refresh: false,
      display: '',
      isPrint: false
    };
  }

  getCreditDetail(e) {
    this.setState({
      creditDetail: e,
    });
  }

  addRepayment(e) {
    this.setState({
      credit_id: e,
      openAddRepayment: true,
    });
  }

  async print(){
    this.setState({
      display: 'display',
      isPrint: true
    });
    const {print} = window.nativeApi;

    await print.invoice();
    await print.reload((data) => {
      if(data === true) {
          this.setState({
              isPrint: false,
          })
      }
  });
  }

  async save() {
    if (
      this.state.repayment_amount === "" ||
      Number(this.state.repayment_amount) < 0
    ) {
      this.props.openToast("Repayment", "Invalid repayment amount", "danger");
      return;
    }

    const requestBody = {
      pay_amount: this.state.repayment_amount,
    };

    const response = await updateCredit(this.state.credit_id, requestBody);

    if (response && response.success === false) {
      this.props.openToast("Credit", response.message, "danger");
      return;
    }

    await this.loadingData();

    this.setState({
      openAddRepayment: false,
      refresh: true,
    });

    await this.loadingData().then(() => {
      this.setState({ refresh: false });
    });
    return;
  }
  
  async loadingData() {
    const response = await getCreditList();
    if (response && response.success === false) {
      return this.props.openToast("Credit", response.message, "danger");
    }
    this.setState({
      credits: response,
    });
    return response;
  }

  async componentDidMount() {
    const {history} = this.props;
    await this.loadingData();

    nativeApi.app.navigateTo((url) => {
      history.push(url);
    });
  }

  render() {
    const {
      credits,
      creditDetail,
      credit_id,
      openAddRepayment,
      repayment_amount,
      refresh,
      isPrint
    } = this.state;
    return (
      <>
      {/* {
        !isPrint? (
          <Navigation props={this.props} />
        ):(<> </>)
      } */}

        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4">
              {!refresh ? (
                <div>
                <CreditDetailComponent
                  data={creditDetail}
                  addRepayment={(e) => this.addRepayment(e)}
                />
                {
                  !isPrint? (
                    <Button className="mt-2" onClick={() => this.print()}> {t('print')} </Button>
                  ): (
                    <>
                    </>
                  )
                }
                </div>
              ) : (
                <>loading</>
              )}
            </div>

            {!isPrint? (
                <div className="col-md-8">
                  <CreditTableComponent
                    data={credits}
                    retrive={(e) => this.getCreditDetail(e)}
                    refresh={refresh}
                  />
                </div>
            ):(
              <></>
            )}
          </div>
        </div>

        <Modal show={openAddRepayment}>
          <Modal.Header>
            <Modal.Title>Add Repayment </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup>
              <FormControl
                type="number"
                value={repayment_amount}
                onChange={(e) =>
                  this.setState({ repayment_amount: Number(e.target.value) })
                }
                placeholder={t('enter-repayment-amount')}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ openAddRepayment: false })}
            >
              {t('close')}
            </Button>
            <Button variant="primary" onClick={() => this.save()}>
              {t('save')}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  reducer: state,
});

const mapDispatchToProps = (dispatch) => ({
  openToast: (title, message, theme) =>
    dispatch(setOpenToastAction(title, message, theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreditPage));
