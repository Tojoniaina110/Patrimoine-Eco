import { useState } from "react";
import Tab from "../Components/tab";
import data from "../assets/data.json";


const Index= () => {
  // state
  const [date, setDate] = useState();
  const [patrimoineValue, setPatrimoineValue] = useState();

  const onDateChange = (dates) => {
    // console.log(dates);
    setDate(dates);
    // console.log(date);
  };
  const calculArgent = (DateDebut, date, valeur) => {
    const dates = new Date(date);
    const date1 = new Date(DateDebut);
    let duree = (dates - date1) / (1000 * 60 * 60 * 24); //jour 4645
    let mois = 0;
    console.log(dates, DateDebut, duree);
    while (true) {
      if (duree <= 30) {
        break;
      }
      duree -= 30;
      mois++;
      console.log("duree");
    }
    console.log(valeur);

    return valeur * mois;
  };

  const valeurMateriel = (date, DateDebut, TauxAmmortissement, valeur) => {
    const date1 = new Date(date);
    const date2 = new Date(DateDebut);
    let duree = (date1 - date2) / (1000 * 60 * 60 * 24); 
    let annee = 0;

    while (true) {
      if (duree < 365) {
        break;
      }

      duree -= 365;
      annee++;
    }

    console.log("Anneé : ", annee);

    for (let i = 0; i < annee; i++) {
      let pourcentage = (valeur * TauxAmmortissement) / 100;
      valeur -= pourcentage;
    }
    return valeur;
  };

  const resteCompteCourant = (
    date,
    dateDebut,
    valeur,
    dateDebutDepense,
    depense
  ) => {
    let compteC = calculArgent(dateDebut, date, valeur);
    let depenses = calculArgent(dateDebutDepense, date, depense);

    return compteC - depenses;
  };

  const patrimoine = (
    espece,
    epargne,
    ValeurMat1,
    ValeurMat2,
    resteCompteCourant
  ) => {
    console.log(espece, epargne, ValeurMat1, ValeurMat2, resteCompteCourant);
    return espece + epargne + resteCompteCourant + ValeurMat1 + ValeurMat2;
  };
  const onClick = () => {
    let found = data.data.find((element) => element.libelle == "CompteCourant");
    let foundDepense = data.data.find(
      (element) => element.libelle == "Train de vie"
    );

    let materiel1 = data.data.find(
      (element) => element.libelle == "Iphone 11 pro max"
    );
    let materiel2 = data.data.find((element) => element.libelle == "Vetements");

    let result = resteCompteCourant(
      date,
      found.DateDebut,
      found.Valeur,
      foundDepense.DateDebut,
      foundDepense.Valeur
    );

    console.log("result", result);
    let mat1 = valeurMateriel(
      date,
      materiel1.DateDebut,
      materiel1.TauxAmmortissement,
      materiel1.Valeur
    );
    let mat2 = valeurMateriel(
      date,
      materiel2.DateDebut,
      materiel2.TauxAmmortissement,
      materiel2.Valeur
    );
    let valEspece = data.data.find((element) => element.libelle == "Espece");
    let valEspargne = data.data.find(
      (element) => element.libelle == "CompteEpargne"
    );

    let reponse =  patrimoine(
      valEspece.Valeur,
      valEspargne.Valeur,
      mat1,
      mat2,
      result
    );

    console.log("Mon patrimoine en ", date, "est :", reponse);
    setPatrimoineValue(reponse);
  };
  return (
    <div>
      <Tab />
      <input type="date" onChange={(e) => onDateChange(e.target.value)} />  
      <button  className="btn btn-outline-success " id="boutton" onClick={() => onClick()}>Valider</button>
      <h1 className="title"> Mon Patrimoine est : <strong>{patrimoineValue !== null ? patrimoineValue : ""}</strong> </h1>
    </div>
  );
};
export default Index;
