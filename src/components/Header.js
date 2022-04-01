import classes from './Header.module.css'

function Header(){
    return <section className={classes.background}> 
        <div className={classes.title}>
            <h1>Employee Management System</h1>
        </div>
    </section>
}

export default Header