import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CFormSelect, CRow } from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
import { useEffect, useState } from "react";
import StatistiqueService from "src/services/statistiqueService";

const fakeYear = [2020, 2021, 2022, 2023, 2024];



const StatMarque=()=>{
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);

    const handleChange=(event)=>{
        fetchData(event.target.value);
    }
    useEffect(()=>{
        StatistiqueService.meilleurMarqueVendue(2024)
        .then(result => {
            if(result.success) {
                const tempLabel = [];
                const tempData = [];
                result.data.map(stat => {
                    tempLabel.push(stat.nom);
                    tempData.push(stat.nbVente);
                })
                setData(tempData);
                setLabel(tempLabel);
            }
        })
    }, [])

    return (
        <CCard className="mb-4">
            <CCardHeader>Marque les plus vendue</CCardHeader>
            <CCardBody>
                <CCardTitle>
                    <CRow>
                        <CCol sm={9}>Marques les plus vendues</CCol>
                        <CCol sm={3}>
                            <CFormSelect aria-label="Default select example" onChange={handleChange}>
                                {fakeYear.map((year, index) => <option key={index} value={year}>{year}</option> )}
                            </CFormSelect>
                        </CCol>
                    </CRow>
                </CCardTitle>
                <CChartPie
                data={{
                    labels: label,
                    datasets: [
                    {
                        data: data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                    ],
                }}
                />
            </CCardBody>
        </CCard>
    )
}
export default StatMarque;