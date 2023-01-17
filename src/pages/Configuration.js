import React, { Component } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SideSectionComponent } from '../components/general/SideSectionComponent';
import { setDatabaseUrl } from '../redux/actions/config.action';
import { zawgyi, t } from '../utilities/translation.utility';
import { messageBoxType } from '../utilities/native.utility';
import { Language } from '../components/general/Language';

class ConfigurationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            messageboxTitle: t('title-db-config')
        }
    }

    saveUrl = async () => {
        const { url, messageboxTitle } = this.state;
        const { setDatabaseUrl, history } = this.props;
        const { nativeApi } = window;
        
        if(url === '') {
            nativeApi.messageBox.open({ title: messageboxTitle, message: t('require-db-url'), type: messageBoxType.info});
            return;
        }

        await nativeApi.notification.show({title: messageboxTitle, body: t('success-db-url')});

        setDatabaseUrl(url);
        history.push('/');
        return;
    };

    render() {
        const { url } = this.state;
        const { lang } = this.props;

        return (
            <div className='container-fluid g-0'>
                <div className='row g-0'>
                    <div className='col-md-6 background-image-layout'>
                        <SideSectionComponent />
                    </div>

                    <div className='col-md-6'>
                        <div className="d-flex flex-row justify-content-end">
						    <Language />
						</div>

                        <div className='flex-col-center-layout'>
                            <img className="logo" src="build/assets/images/logo.png" />

                            <div className='col-11 col-sm-7 col-md-11 col-lg-7'>
                                <h3 className={`title-default mt-3 ${zawgyi(lang)}`}> {t('title-db-config')} </h3>

                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        placeholder={t('placeholder-db-url')}
                                        value={url}
                                        onChange={e => this.setState({ url: e.target.value })}
                                        onKeyPress={e => e.code === 'Enter' && this.saveUrl()}
                                    />

                                    <Button className="btn btn-samll btn-border-right" onClick={() => this.saveUrl()}> {t('btn-submit')} </Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
});

const mapDispatchToProps = (dispatch) => ({
    setDatabaseUrl: (url) => dispatch(setDatabaseUrl(url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConfigurationPage));