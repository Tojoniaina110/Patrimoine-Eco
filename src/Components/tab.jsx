import data from "../assets/data.json";


const Tab = () => {
  // console.log(data);
  return (
    //libelle valeur initial date debut date fin taux d'amortissement

    <div>
      <table className="table table-bordered table-dark ">
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur initital</th>
            <th>Date debut</th>
            <th>Date fin</th>
            <th>Taux amortissement</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.libelle}</td>
                <td>{item.Valeur}</td>
                <td>{item.DateDebut}</td>
                <td></td>
                <td>{item.TauxAmmortissement}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tab;
