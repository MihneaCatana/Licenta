import styles from "./Login.css"
import LogInPhoto from "../../assets/Login.svg"

export default function Login(){

    return(
        <div className={styles.login_layout}>
            <div className={styles.login_card}>
                <img src={LogInPhoto} alt="Login" className={styles.login_image}/>
            </div>
        </div>
    )
}

