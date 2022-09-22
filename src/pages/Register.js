import { Logo,FormRow } from '../components';
import {useState, useEffect} from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

function Register() {
    const [values, setValues] = useState(initialState)

    const {user, isLoading} = useSelector(store => store.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e)=> {
        const name = e.target.name 
        const value = e.target.value 
        // console.log(`${name}:${value}`);
        setValues({...values, [name]:value})
    };

    const onSubmit = (e)=>{
        e.preventDefault()
        const {name,email,password,isMember} = values;
        if(!email || !password || (!isMember && !name)){
            toast.error('Please fill out all fields');
            return;
        }
        if(isMember){
            dispatch(loginUser({email: email, password: password}))
            return;
        }
        dispatch(registerUser({name, email, password}))
    }

    const toggleMember = ()=>{
        setValues({...values, isMember: !values.isMember})
    }

    useEffect(()=> {
        if(user){
            setTimeout(()=>{
                navigate('/');
            }, 2000)
        }
    }, [user])

  return (
    <Wrapper className='full-page'>
        <form onSubmit={onSubmit} className="form">
            <Logo />
            <h3>{values.isMember? 'Login' : 'Register'}</h3>
            {/* name field  */}
            {!values.isMember && <FormRow 
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            />}
    
             {/* email field  */}
            <FormRow 
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
            />

             {/* name field  */}
            <FormRow 
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
            />
        <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading? 'Loading...':'Submit'}
        </button>
        <button className='btn btn-block btn-hipster' type='button' disabled={isLoading} onClick={()=>dispatch(loginUser({email:'testUser@test.com', password:'secret'}))}>
            {isLoading? 'Loading...':'demo app'}
        </button>
        
        <p>
           {values.isMember? 'Not a member yet?':'Already a member?'}
            <button type='button' onClick={toggleMember} className='member-btn'>
                {values.isMember? 'Register': 'Login'}
            </button>
        </p>
        </form>
    </Wrapper>
  )
}

export default Register


//He're we're grabbing whatever we have in the state(name) and making it equal to whatever we have in the input uisng dynamc object ppt