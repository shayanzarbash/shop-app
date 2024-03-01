import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { IRootState } from '../../redux/app/store';
import { IProduct } from '../../libraries/product-type';

export default function Header() {

    const products = useSelector<IRootState, IProduct[]>(state => state.navbarReducer.value); // products is an array

    function numberOfProducts() {
        let number = 0;
        for (let i = 0; i < products.length; i++) {
            number += products[i].quantity;
        }
        return number;
    }

    const navigate = useNavigate();


    //const navigate = useNavigate();
    const handleCartIcon = () => {
        navigate("/shoppingCart");
        window.scroll({ top: 0, behavior: 'smooth' });
    }

    const handleHomeIcon = () => {
        navigate("/");
        window.scroll({ top: 0, behavior: 'smooth' });
    }


    return (
        <div className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.icon}>
                    <ShoppingCartOutlined
                        className={styles.iconInDiv}
                        onClick={handleCartIcon}
                    />
                    <Badge count={numberOfProducts()} showZero color='#faad14' />
                </div>
                <div className={styles.icon}>
                    <HomeOutlined
                        className={styles.iconInDiv}
                        onClick={handleHomeIcon}
                    />
                </div>
                <div className={styles.numberOfProducts}></div>
            </div>
        </div>
    )
}
