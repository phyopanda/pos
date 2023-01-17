import React, { Component } from 'react'
import Navigation from '../../components/navigation';
import DataTable from 'react-data-table-component';
import { getRandomName } from '../../testcase/generateUser';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import '../../assets/css/user.css';

const columns = [
    {
        name: 'နာမည်',
        selector: row => `${row.first_name} ${row.last_name}`,
        sortable: true,
    },
    {
        name: 'ဖုန်းနံပါတ်',
        selector: row => row.phone,
        sortable: true,
    },
    {
        name: 'အီးမေး(လ်)လိပ်စာ',
        selector: row => row.email,
        sortable: true,
    },
];


const generateUserList = (limit) => {
    let list = [];

    for(let x=0; x<limit; x++) {
        list.push({
            id: x + 1,
            first_name: getRandomName(5),
            last_name: getRandomName(10) + x,
            phone: 421038123 + x,
            email: `${getRandomName(10)}${x}@gmail.com`
        })
    }

    return list;
};


const paginationComponentOptions = {
    noRowsPerPage: false,
    rowsPerPageText: 'ကြည့်ရှုမည့်မှတ်တမ်းအရေအတွက်',
    rangeSeparatorText: '| စုစုပေါင်းမှတ်တမ်းအရေအတွက်',
    selectAllRowsItem: false,
};

const DataTableLoading = () => {

    return(
        <div className='data-table-loading-wrapper'>
            <span> အချက်အလက်များ လုပ်ဆောင်နေပါသည် </span>
        </div>
    )
}

const SubHeaderComponent = () => {
    return(
        <div>
            <InputGroup className='input-group-search'>
                <FormControl
                    type='text'
                    placeholder='အရောင်းစာရေးနာမည်/ဖုန်းနံပါတ်ဖြင့် ရှာဖွေရန်'
                />

                <Button className='btn-search'> ရှာဖွေမည် </Button>
            </InputGroup>
        </div>
    )
}


export default class UserViewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userlist: generateUserList(10000),
            table_loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                table_loading: false
            })
        }, 3000);
    }

    render() {
        const { userlist, table_loading } = this.state;

        return (
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row reset-gutter'>
                        <h3> User </h3>
                        <DataTable
                            className='user-table'
                            subHeader={true}
                            subHeaderComponent={<SubHeaderComponent />}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                            columns={columns}
                            data={userlist}
                            selectableRows={true}
                            onSelectedRowsChange={e => console.log(e)}
                            paginationComponentOptions={paginationComponentOptions}
                            progressPending={table_loading}
                            progressComponent={<DataTableLoading />}
                            dense
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                </div>
            </>
        )
    }
}
