import { cilArrowTop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CRow, CWidgetStatsA } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatistiqueService from "src/services/statistiqueService";

const StatWidget=()=>{
    const [nbUtilisateurTotal, setNbUtilisateurTotal] = useState(26000);
    const [mostSelledMarque, setMostSelledMarque] = useState({id: 1, nom: "", nbVente: ''});
    const [mostSelledModele, setMostSelledModele] = useState({id: 1, nom: "NISSAN", marque: 'TOYOTA', nbVente: 20});
    const [commission, setCommission] = useState({id: 0, valeur: 20});
    const [chiffreAffaire, setChiffreAffaire] = useState(20000000);

    const fetchData=()=>{
        StatistiqueService.meilleurMarqueVendueOne()
        .then(result => {
            if (result.success) {
                setMostSelledMarque(result.data);
            }
        })
        .catch(error => alert(error))
        
        StatistiqueService.commission()
        .then(result => {
            if (result.success) {
                setCommission(result.data);
            }
        })
        .catch(error => alert(error))

        StatistiqueService.chiffreAffaire()
        .then(result => {
            if (result.success) {
                setChiffreAffaire(result.data);
            }
        })
        .catch(error => alert(error))

        StatistiqueService.nbInscritTotal()
        .then(result => {
            if (result.success) {
                setNbUtilisateurTotal(result.data);
            }
        })
        .catch(error => alert(error))
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <CRow>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                className="mb-4"
                color="primary"
                value={
                    <>
                    {nbUtilisateurTotal.toLocaleString()}
                    </>
                }
                title="Nombre d'utilisateur"
                chart={
                    <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '70px' }}
                    data={[]}
                    />
                }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                className="mb-4"
                color="info"
                value={
                    <>
                    {mostSelledMarque.nom}
                    <span className="fs-6 fw-normal">
                        ({mostSelledMarque.nbVente.toLocaleString()})
                    </span>
                    </>
                }
                title="Marque la plus vendu"
                chart={
                    <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '70px' }}
                    data={[]}
                    />
                }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                    <>

                    {`${chiffreAffaire.toLocaleString()} AR`}
                    <span className="fs-6 fw-normal">
                        (84.7% <CIcon icon={cilArrowTop} />)
                    </span>
                    </>
                }
                title="Chiffre d'affaire de ce mois"
                chart={
                    <CChartLine
                    className="mt-3"
                    style={{ height: '70px' }}
                    data={[]}
                    />
                }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                className="mb-4"
                color="danger"
                value={
                    <>
                        {commission.valeur}%
                    </>
                }
                title="Commission actuelle"
                chart={
                    <CChartBar
                    className="mt-3 mx-3"
                    style={{ height: '70px' }}
                    data={[]}
                    />
                }
                />
            </CCol>
        </CRow>
    )
}
export default StatWidget;