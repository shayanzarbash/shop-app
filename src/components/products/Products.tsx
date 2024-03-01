import React from "react";
import { Card } from "antd";
import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { add } from '../../redux/features/navbar/navbarSlice.ts';
import { IRootState } from '../../redux/app/store.ts';
import { IProduct } from "../../libraries/product-type.ts";


function Products() {

    const products = useSelector<IRootState, IProduct[]>(state => state.productsReducer.value);
    const dispatch = useDispatch();

    return (
        <>
            <h2 className={styles.flexRoot}>محصولات</h2>
            <div className={styles.flexRoot}>
                <div className={styles.flexContainer}>
                    {products.length > 0 && products.map((eachProduct: IProduct, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                <Card
                                    hoverable
                                    style={{ width: 240, height: 360 }}
                                    cover={<img
                                        alt={eachProduct.id + " image"}
                                        src={eachProduct.thumbnail}
                                        width={240}
                                        height={180}
                                    />}
                                >
                                    <h5>{eachProduct.title}</h5>
                                    <div className={styles.itemInfo}>
                                        <h3>
                                            <span>$</span>
                                            {eachProduct.price}
                                        </h3>
                                        <ShoppingCartOutlined onClick={() => dispatch(add(eachProduct))} />
                                    </div>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div >
        </>
    )
}

export default Products;
