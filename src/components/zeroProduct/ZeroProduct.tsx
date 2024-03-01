import "./ZeroProduct.module.css";
import { StopOutlined } from "@ant-design/icons";
import styles from './ZeroProduct.module.css'

export default function ZeroProduct() {
    return (
        <div className={styles.zeroProducContainer}>
            <h3>محصولی وجود ندارد</h3>
            <StopOutlined />
        </div>
    )
}
