import {Logo} from '../components'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
   <Wrapper> 
    <nav>
       <Logo/>
    </nav>
    <div className="container page">
        {/* info */}
        <div className="info">
            <h1>
                job <span>tracking </span>app
            </h1>
            <p>
                I'm baby intelligentsia mustache pabst 90's tousled asymmetrical. Green juice wolf chartreuse heirloom cray, palo santo affogato fingerstache actually wayfarers yr swag hammock. 
            </p>
        <Link to='/register' className='btn btn-hero'>
            login/register
        </Link>
        </div>
        <img src={main} className="img main-img" alt="job hunt" />
    </div>
   </Wrapper>
  )
}


export default Landing