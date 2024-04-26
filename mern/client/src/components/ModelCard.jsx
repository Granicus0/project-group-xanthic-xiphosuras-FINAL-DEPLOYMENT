import './css/ModelCard.css'
const ModelCard = ({modelInfo}) => {
    return (
        <div className="model-info">
            <h4>{modelInfo.model_name}</h4>
            <p> Model Type: {modelInfo.model_type}</p>
        </div>
    )
}

export default ModelCard