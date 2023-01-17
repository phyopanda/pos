import { t } from '../../utilities/translation.utility';
import { TAX_CHANGE , SET_TAX_CHANGE} from '../actionTypes'

export const taxAction = ( tax ) => async (dispatch) => {
  localStorage.setItem(TAX_CHANGE, tax);
  const data = tax;

  window.nativeApi.notification.show({
    title: t('title-tax-change'),
    body: t('success-tax-change')
  })

  return dispatch({
    type: SET_TAX_CHANGE,
    payload: data,
  });
}
