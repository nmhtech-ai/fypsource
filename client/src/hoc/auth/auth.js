import React, { Suspense } from 'react';
import BrandImageBB from '../../assets/brand/brand-mathx-blueblack.png';
import classes from './auth.module.css';
import Loader from '../../components/loader/loader';
import BdGalaxy from '../../components/uInteface/backdrop/bd-galaxy'
import LangBox from '../../components/uInteface/languagebox/langbox';
import LoginPage from '../../pages/login/login';
import LoadCheckHOC from '../loadCheck/loaderCheck';

const Authentication = () => {

    return (
        <Suspense fallback={<Loader />}>
            <BdGalaxy>
                <LoadCheckHOC bg="image">
                    <div className={[classes.card,
                        "card col-xl-4 col-lg-6 col-md-6 col-sm-8 col-12 position-absolute top-50 start-50 translate-middle position-relative"].join(' ')}>
                        <div className="card-body">
                            <form>
                                <img
                                    className={classes.brandLogo}
                                    alt="MathX Brand Logo"
                                    height="20%"
                                    width="60%"
                                    src={BrandImageBB} />
                                <LoginPage />
                            </form>
                        </div>
                        <LangBox />
                    </div>
                </LoadCheckHOC>
            </BdGalaxy>
        </Suspense >

    );
};

export default Authentication;