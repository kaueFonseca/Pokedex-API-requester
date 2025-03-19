import { Link } from 'react-router-dom'

const GoBackToHomeButton = () => {
    return (
        <div>
            <button>
                <Link to="/">HOME</Link>
            </button>
        </div>
    )
}

export default GoBackToHomeButton
