import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer>
            <hr/>
            <div className={styles.footer}>
                <div>
                    {new Date().getFullYear()} «@yataw»
                </div>
            </div>
        </footer>
    );
};
