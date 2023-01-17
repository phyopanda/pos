import numeral from "numeral";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { t } from 'i18next';

export const CreditDetailComponent = ({ data, addRepayment }) => {
  const [detail, setDetail] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [isRepayment, setIsRepayment] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (data && data.length > 0) {
      const repayments = JSON.parse(data[0].repayment);

      setDetail(data[0]);
      setRepayments(repayments);


      const repaymentAmounts = repayments.map((value) => value.pay_amount);
      const totalPayAmount = repaymentAmounts.reduce((a, b) => a + b, 0);
      const actualAmount = data[0].invoice.total_amount;
      const discount = data[0].invoice.discount;
      const totalAmountWithTax = ((Number(actualAmount))+((Number(actualAmount))*(15/100))) - discount;

      if (totalPayAmount >= totalAmountWithTax) {
        setIsRepayment(true);
      } else setIsRepayment(false);
    }
  }, [data]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <h4>
            {" "}
            {detail ? (
              <span> {t('credit-id')} - {detail.id} </span>
            ) : (
              <span> Credit Information</span>
            )}{" "}
          </h4>
          {detail && <span> {t('invoice-id')} - {detail.invoice_no} </span>}
        </Card.Title>
      </Card.Header>

      <Card.Body>
        {detail && (
          <div>
            {detail &&
              detail.invoice.customer_name &&
              detail.invoice.customer_name && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    {t('name')} : {detail && detail.invoice.customer_name}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_phone &&
              detail.invoice.customer_phone && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    {t('phone')} : {detail && detail.invoice.customer_phone}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_email &&
              detail.invoice.customer_email && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    {t('email')} : {detail && detail.invoice.customer_email}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_address &&
              detail.invoice.customer_address && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    {t('address')} :{" "}
                    {detail && detail.invoice.customer_address}{" "}
                  </span>
                </div>
              )}

            <div className="table-responsive mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th> {t('pay-amount')} </th>
                    <th> {t('pay-date')} </th>
                  </tr>
                </thead>

                <tbody>
                  {repayments.length > 0 &&
                    repayments.map((repayment, index) => {
                      return (
                        <tr key={`repayment_id_${index}`}>
                          <td>
                            {" "}
                            {numeral(repayment.pay_amount).format(
                              "0,0"
                            )} MMK{" "}
                          </td>
                          <td>
                            {" "}
                            {moment(repayment.pay_date).format("Y-MM-DD")}{" "}
                          </td>
                        </tr>
                      );
                    })}

                  {!isRepayment ? (
                    <tr>
                      <td colSpan={2}>
                        <Button
                          className="btn w-full"
                          onClick={() => addRepayment(data[0].id)}
                        >
                          {" "}
                          {t('add-repayment')}{" "}
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!detail && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span> {t('no-preview')} </span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
