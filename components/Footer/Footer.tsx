import styles from './Footer.module.scss';
import {Divider} from '@material-ui/core';
import React, {FC} from 'react';

type Props = {
    className?: string;
};

export const Footer: FC<Props> = ({className}) => {
    return (
        <footer className={className}>
            <Divider />

            <div className={styles.footer}>{`${new Date().getFullYear()} @yataw`}</div>
        </footer>
    );
};
