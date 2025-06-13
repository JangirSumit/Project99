/* eslint-disable react/no-unescaped-entities */
const ForbiddenAccess = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center border rounded shadow p-5 bg-white">
                <div className="mb-4">
                    <i className="bi bi-shield-lock text-danger display-4"></i>
                </div>
                <h1 className="display-3 fw-bold">403</h1>
                <h2 className="mb-3">Forbidden</h2>
                <p className="text-muted mb-4">
                    You don't have permission to access this page. Please contact your administrator or return to the homepage.
                </p>
                <a href="/" className="btn btn-primary px-4">
                    Go to Homepage
                </a>
            </div>
        </div>
    );
};

export default ForbiddenAccess;
