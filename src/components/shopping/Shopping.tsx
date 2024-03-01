import styles from './Shopping.module.css';
import { DeleteOutlined } from "@ant-design/icons";
import ZeroProduct from "../zeroProduct/ZeroProduct";
import { IRootState } from '../../redux/app/store.ts';
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../libraries/product-type.ts";
import { add, remove, removeOne } from "../../redux/features/navbar/navbarSlice.ts";

export default function Shopping() {
    const productsInShoppingCart = useSelector<IRootState, IProduct[]>((state) => state.navbarReducer.value); // productsInShoppingCart is an array

    function calculateTotalPrice() {
        let totalPrice = 0;
        for (let i = 0; i < productsInShoppingCart.length; i++) {
            totalPrice += productsInShoppingCart[i].price * productsInShoppingCart[i].quantity; // Her ürünü adedi ile çarparak toplam fiyatı hesaplama
        }
        return totalPrice;
    }

    const dispatch = useDispatch();

    const defaultStyle = {
        color: "#9d174d",
        cursor: "pointer"
    }

    const otherStyle = {
        color: "#dcd9d9",
        cursor: "default"
    }

    return (
        <>
            <h2 className={styles.shoppingCartHeading}>SHOPPING CART</h2>
            {calculateTotalPrice() === 0 ? (
                <ZeroProduct />
            ) : (
                <>
                    {productsInShoppingCart.map((eachProduct: IProduct, index: number) => (
                        <div
                            className={styles.singleCartContainer}
                            key={index}
                        >
                            <img src={eachProduct.thumbnail} alt={"product image"} />
                            <div className={styles.details}>
                                <span className={styles.brand}>{eachProduct.brand}</span>
                                <span className={styles.title}>{eachProduct.title}</span>
                            </div>
                            <div className={styles.quantity}>
                                <div className={styles.quantity} onClick={() => dispatch(removeOne(eachProduct.id))} style={eachProduct.quantity < 2 ? otherStyle : defaultStyle}>-</div>
                                <div className={styles.quantity}>{eachProduct.quantity}</div>
                                <div className={styles.quantity} onClick={() => dispatch(add(eachProduct))}>+</div>
                            </div>
                            <div className={styles.price}>
                                <span className={styles.dolarSpan}>$</span>
                                <span className={styles.priceSpan}>{eachProduct.price * eachProduct.quantity}</span>
                                <span
                                    className={styles.trashIcon}
                                    onClick={() => dispatch(remove(eachProduct.id))}
                                >
                                    <DeleteOutlined />
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className={styles.totalPriceDiv}>
                        <span className={styles.left}>Total Price: </span>
                        <span className={styles.dolar}>$</span>
                        <span className={styles.right}>{calculateTotalPrice()}</span>
                    </div>
                </>
            )}
        </>
    );
}
