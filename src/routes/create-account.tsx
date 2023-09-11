import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";



export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === 'name') {
            setName(value)
        }else if(name === "email") {
            setEmail(value)
        }else if(name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        if(isLoading || name === '' || email === '' || password === '') return;
        try{
            setIsLoading(true);
            //파이어베이스 - 계정 생성
            const credentials = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            console.log(credentials.user);
            
            //사용자 프로필 이름 지정
            await updateProfile(credentials.user, {
                displayName: name,
            })

            //홈페이지 이동
            navigate("/")

        } catch(e) {
            if(e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
        
        console.log(name, email, password)
    }

    return(
        <Wrapper>
            <Title>Join 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                    onChange={onChange}
                    name="name" 
                    value={name} 
                    placeholder="Name" 
                    type="text" 
                    required 
                />
                <Input 
                    onChange={onChange}
                    name="email" 
                    value={email}
                    placeholder="Email" 
                    type="email" 
                    required 
                />
                <Input 
                    onChange={onChange}
                    name="password" 
                    value={password} 
                    placeholder="Password" 
                    type="password" 
                    required 
                />
                <Input 
                    type="submit" 
                    value={isLoading ? "Loading..." : "Create account" }
                />
                
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? {" "} 
                <Link to="/login">Log in &rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}