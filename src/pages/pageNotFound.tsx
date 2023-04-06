import Header from "../components/header";

export default function PageNotFound() {
    return <>
    <Header />
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-5 text-center">
                <p className="fw-bold fs-1">Error 404!</p>
                <p>The requested page could not be found on the server. Go back to <a href="/">Home</a>.</p>
            </div>
        </div>
    </div>
    </>
}