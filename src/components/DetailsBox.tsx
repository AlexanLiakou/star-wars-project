import type { ReactNode } from "react";

type DetailsBoxProps = {
    children?: ReactNode
};

const DetailsBox = ({children} : DetailsBoxProps) => {
    return (
        <div style={{ minHeight: "175px" }} className="grow flex flex-col gap-4 items-start justify-center mt-10 border border-star-mustard rounded-md p-3">
            {children}
        </div>
    );
}

export default DetailsBox;