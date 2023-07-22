import React from "react";
import DisplayCardDetail from "./displayCardDetail";

const ProductPreview = ({ authState }) => {
    return (
        <div>
            <DisplayCardDetail authState={authState} />
        </div>
    )
}

export default ProductPreview;