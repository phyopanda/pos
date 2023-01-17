import React from 'react'
import { Button, Card, FormControl } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../table/paginationOptions'

const BackupTableList = ({}) => {

  return (
    <Card>
      <Card.Header>
        <div  className='d-flex flex-row'>
          <Card.Title className='me-3'>Restore Point</Card.Title>
          <FormControl
          className='w-25 me-3'
          type='date'
          placeholder='Choose Date' />
          <Button>
            Restore Log
          </Button>
            <div className='col'>
              <div className='d-md-flex flex-md-row justify-content-end align-items-center'>
              <Button>
              Export
            </Button>
              </div>
            
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <DataTable
          subHeader={true}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHead
          keyField
          dense
          highlightOnHover
          pointerOnHover
          selectableRows={true}
          selectableRowsHighlight={true}
          paginationPerPage={10}/>
      </Card.Body>
    </Card>
    
  )
}

export default BackupTableList