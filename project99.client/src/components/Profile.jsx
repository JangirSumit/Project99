import { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import Role from '../common/Role';
import ForbiddenAccess from '../components/ForbiddenAccess';
import { GlobalStyle } from '../themes/GlobalStyle';
import {
    Page,
    Card,
    Avatar,
    Name,
    Username,
    RoleBadge,
    Form,
    Field,
    StyledInput,
    Alert,
    SubmitButton
} from '../themes/ProfileStyle';

const Profile = () => {
    const { state } = useContext(GlobalContext);
    const user = state.profile;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    if (user.role !== 0) {
        return <ForbiddenAccess />;
    }

    const defaultProfilePic =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random&color=fff`;

    const handlePasswordUpdate = async e => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'danger', text: 'New passwords do not match!' });
            return;
        }
        setLoading(true);
        try {
            // Replace with actual API call
            await new Promise(res => setTimeout(res, 1000));
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error(err);
            setMessage({ type: 'danger', text: 'Error updating password!' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Page>
                <Card>
                    <Avatar src={defaultProfilePic} alt="Profile" />
                    <Name>{user.name}</Name>
                    <Username>@{user.userName}</Username>
                    <RoleBadge>{Role[user.role]}</RoleBadge>

                    <Form onSubmit={handlePasswordUpdate}>
                        {message && <Alert type={message.type}>{message.text}</Alert>}

                        <Field>
                            <StyledInput
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <StyledInput
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <StyledInput
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Field>

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </SubmitButton>
                    </Form>
                </Card>
            </Page>
        </>
    );
};

export default Profile;