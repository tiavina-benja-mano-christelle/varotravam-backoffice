import { CCard, CCardBody, CCol, CFormSelect, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { useEffect, useState } from "react";
import StatistiqueService from "src/services/statistiqueService";

const fakeYear = [2020, 2021, 2022, 2023, 2024];
const label = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mais', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

const StatUser=()=>{
    const [graphes, setGraphes] = useState([]);
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    }, [])

    const fetchData= (annee = 2024)=>{
        StatistiqueService.utilisateurs(annee)
        .then(result => {
            if(result.success) {
                setData(result.data);
            }
        })
        .catch(error => console.log(error))
    }

    const handleChange=(event)=>{
        fetchData(event.target.value);
    }

    return (
        <CCard className="mb-4">
            <CCardBody>
            <CRow>
                <CCol sm={10}>
                    <h4 id="traffic" className="card-title mb-0"> Compte créé</h4>
                </CCol>
                <CCol sm={2}>
                    <CFormSelect aria-label="Default select example" onChange={handleChange}>
                        {fakeYear.map((year, index) => <option key={index} value={year}>{year}</option> )}
                    </CFormSelect>
                </CCol>
            </CRow>
            <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                labels: label,
                datasets: [
                    {
                    label: 'Nombre d\'utilisateur',
                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: data,
                    fill: true,
                    },
                ],
                }}
                options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false,
                    },
                },
                scales: {
                    x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                    },
                    y: {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250,
                    },
                    },
                },
                elements: {
                    line: {
                    tension: 0.4,
                    },
                    point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                    },
                },
                }}
            />
            </CCardBody>
        </CCard>
    )
}
export default StatUser;