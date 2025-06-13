import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

import { GlobalStyle } from '../themes/GlobalStyle';
import {
    Page,
    Card,
    Title,
    Form,
    Input,
    CheckboxWrapper,
    Label,
    Button
} from '../themes/LoginStyles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const [authToken, setAuthToken] = useLocalStorage('authToken', { token: '' });

    const from = location.state?.from?.pathname + (location.state?.from?.search || "") || "/";

    useEffect(() => {
        if (authToken.token && location.pathname !== from) {
            navigate(from, { replace: true });
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: username, password }),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            const data = await res.json();
            if (data?.token) {
                setAuthToken(data, rememberMe);
                navigate(from, { replace: true });
            }
        } catch (err) {
            alert(err.message || 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Page>
                <Card>
                    <Title>Login</Title>
                    <Form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <CheckboxWrapper>
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            <Label htmlFor="remember">Remember Me</Label>
                        </CheckboxWrapper>
                        <Button type="submit" disabled={isLoading}>Log In</Button>
                    </Form>
                </Card>
            </Page>
        </>
    );
};

export default Login;