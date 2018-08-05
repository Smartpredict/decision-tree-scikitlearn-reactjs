import React from "react"
// import List from "./List"
import Form from "./Form"
import ColSelect from "./ColSelect"
import Predict from "./Predict"

const App = () => (
	<div className="container">
		<h2 className="col-md-12">Choisir le fichier</h2>
		<Form />
		<ColSelect />
		<Predict />
	</div>
)

		//<div>
		//	<h2>Test Classification par arbre de décision</h2>
		//	<List />
		//</div>

export default App