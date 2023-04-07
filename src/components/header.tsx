import { useNavigate } from "react-router-dom";
import { checkJWT, logout } from "../utils/api";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Fitoor
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="/post"
                >
                  Posts
                </a>
              </li>
            </ul>
          </div>

          <div>
            {checkJWT() ?
              <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
              :
              <div className="mx-2">
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                <a href="#" className="text-decoration-none text-white px-4" onClick={(e) => { e.preventDefault(); navigate('/signup');}}>Signup</a>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
}
