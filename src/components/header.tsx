import { useNavigate } from "react-router-dom";
import { checkJWT, getUserProfile, logout } from "../utils/api";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();

  const getUser = async () => {
    const res = await getUserProfile();

    if (!res.error) {
      setUser(res.message);
    } else {
      console.log("Cannot fetch USER");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

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
              <>
                <div className="dropdown">
                  <a className="dropdown-toggle text-decoration-none text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user ? user.username : 'Username'}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="btn btn-primary dropdown-item" onClick={() => logout()}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
              :
              <div className="mx-2">
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                <a href="#" className="text-decoration-none text-white px-4" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Signup</a>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
}
