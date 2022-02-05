import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { BreadCrumb } from 'primereact/breadcrumb';

import { createDegree, getDegrees, updateDegree, deleteDegree } from "../../../actions/degreeAction";


const Degree = () => {

    let emptyDegree = {
        degreeId: null,
        degreeName: '',
    };

    //const [setDegrees] = useState();
    const [degreeDialog, setDegreeDialog] = useState(false);
    const [deleteDegreeDialog, setDeleteDegreeDialog] = useState(false);
    const [deleteDegreesDialog, setDeleteDegreesDialog] = useState(false);
    const [degree, setDegree] = useState(emptyDegree);
    const [selectedDegrees, setSelectedDegrees] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const degreetypes = useSelector(state => state.degreeReducer);
    const dispatch = useDispatch();

    const fetchData = async () => {
        debugger;
        await dispatch(getDegrees());
    }

    useEffect(() => {

        dispatch(getDegrees())
        //.then(departmentTypes => { setDepartments(departmentTypes); console.log(departmentTypes) }).catch(e => { console.log(e) })

    }, [dispatch]);



    const openNew = () => {
        setDegree(emptyDegree);
        setSubmitted(false);
        setDegreeDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setDegreeDialog(false);
    }

    const hideDeleteDegreeDialog = () => {
        setDeleteDegreeDialog(false);
    }

    const hideDeleteDegreesDialog = () => {
        setDeleteDegreesDialog(false);
    }

    const items = [
        { label: 'Settings' },
        { label: 'Degree' },
    ];
    
    const home = { icon: 'pi pi-home', url: '/Home' }


    const saveDegreeType = async () => {
        setSubmitted(true);

        debugger;
        if (degree.degreeName.trim()) {

            if (degree.degreeId) {
                await dispatch(updateDegree(degree.degreeId, degree))
                    .then(response => {
                        console.log(response);

                    })
                    .catch(e => {
                        console.log(e);
                    });


                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Degree Updated!', life: 1500 });

            }
            else {

                await dispatch(createDegree(degree.degreeName)).then((degree) => {
                    setDegree({
                        degreeName: degree.degreeName,
                    });

                    console.log(degree);

                }).catch((e) => {
                    console.log(e);
                });


                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Degree Created!', life: 1500 });


            }

            debugger;
            setDegree(null);
            setDegreeDialog(false);
            setDegree(emptyDegree);

        }

        await fetchData();
    }



    const editDegree = (degree) => {
        setDegree({ ...degree });
        setDegreeDialog(true);



    }

    const confirmDeleteDegree = (degree) => {
        setDegree(degree);
        setDeleteDegreeDialog(true);
    }

    const deleteDegreeType = async () => {
        debugger;

        let _degrees = degree.degreeId;

        await dispatch(deleteDegree(_degrees))
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });

        setDegree(_degrees);
        setDeleteDegreeDialog(false);
        setDegree(emptyDegree);

        await fetchData();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Degree Deleted!', life: 2000 });
    }



    const confirmDeleteSelected = () => {
        setDeleteDegreesDialog(true);
    }

    const deleteSelectedDegrees = async () => {

        debugger;

        let _degrees = degree.degreeId;

        await dispatch(deleteDegree(_degrees))
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });


        setDegree(_degrees);
        setDeleteDegreesDialog(false);
        setSelectedDegrees(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Degree Deleted!', life: 3000 });
    }


    const onInputChange = (e, degreeName) => {
        const val = (e.target && e.target.value) || '';
        let _degree = { ...degree };
        _degree[`${degreeName}`] = val;

        setDegree(_degree);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <BreadCrumb model={items} home={home} style={{border: "none", padding: "0", background: "#f7f9fa"}} />
            </React.Fragment>
        )
    }


    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedDegrees || !selectedDegrees.length} />
            </React.Fragment>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editDegree(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteDegree(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">List of Degrees</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const degreeDialogFooter = (
        <React.Fragment>
            <button className="p-button p-component p-button-danger" onClick={hideDialog}>
                <span className="p-button-icon p-c pi pi-times p-button-icon-left"></span><span className="p-button-label p-c">Cancel</span>
            </button>

            <button className="p-button p-component p-button-success" onClick={saveDegreeType}>
                <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span><span className="p-button-label p-c">Save</span>
            </button>
        </React.Fragment>
    );
    const deleteDegreeDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDegreeDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteDegreeType} />
        </React.Fragment>
    );
    const deleteDegreesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDegreesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedDegrees} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-mb-0" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={degreetypes} selection={selectedDegrees} onSelectionChange={(e) => setSelectedDegrees(e.value)}
                    dataKey="degreeId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} departments"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="degreeName" header="Name" sortable></Column>
                    <Column field="" header="" ></Column>
                    <Column field="" header="" ></Column>
                    <Column field="" header="" ></Column>
                    <Column field="" header="" ></Column>
                    <Column field="" header="" ></Column>
                    <Column body={actionBodyTemplate} header="Action"></Column>
                </DataTable>
            </div>

            <Dialog visible={degreeDialog} style={{ width: '450px' }} header="Degree" modal className="p-fluid" footer={degreeDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="degreeName">Degree Name <span style={{ color: 'red' }}>*</span></label>
                    <InputText id="degreeName" value={degree.degreeName} onChange={(e) => onInputChange(e, 'degreeName')} required autoFocus className={classNames({ 'p-invalid': submitted && !degree.degreeName })} />
                    {submitted && !degree.degreeName && <small className="p-error">Working place name is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteDegreeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDegreeDialogFooter} onHide={hideDeleteDegreeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {degree && <span>Are you sure you want to delete <b>{degree.degreeName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteDegreesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDegreesDialogFooter} onHide={hideDeleteDegreesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {degree && <span>Are you sure you want to delete the selected working places?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Degree;
