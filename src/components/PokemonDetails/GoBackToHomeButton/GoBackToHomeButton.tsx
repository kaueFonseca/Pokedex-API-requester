import { Link } from 'react-router-dom'
import ArrowLeft from '../../../assets/left-arrow.svg'
import styled from 'styled-components'

const GoBackToHomeButton = () => {
    return (
        <div>
            <Button>
                <Link to="/">
                    <img src={ArrowLeft} alt="" />
                </Link>
            </Button>
        </div>
    )
}

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    top: 4px;
    img {
        width: 11px;
    }
`

export default GoBackToHomeButton
