import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import Terminal from 'react-console-emulator';
import {useAppContext} from 'hooks/useAppContext';
import {chunk} from 'lodash';
import {useDispatch} from 'react-redux';
import {setLevel} from 'actions/page';
import {isValidLevel} from 'utils/is-valid-level';
import {AppContextType} from 'components/AppContext';

const DEFAULT_HEIGHT = 500 as const;

const getCommands = (ctx: AppContextType, terminal: ToDo, onLevelChanged: (level: Level) => void): ToDo => {
    const {puzzleApi: api} = ctx;
    return {
        help: {
            fn: () => api.help(),
        },
        new: {
            fn: (value: any) => {
                const level = Number(value);

                if (isValidLevel(level)) {
                    onLevelChanged(level);
                }

                // pass user's input as is
                // @ts-ignore
                return api.setLevel(level);
            },
        },
        map: {
            fn: () => api.map(),
        },
        rotate: {
            // pass user's input as is
            // @ts-ignore
            fn: (...args: string[]) => api.rotate(...chunk(args.map(arg => Number(arg)), 2)),
        },
        verify: {
            fn: () => api.verify(),
        },

        // sytem
        clear: {
            fn: () => terminal.clearStdout(),
        },
    };
};

const TerminalComponent: FC = () => {
    const welcomeMessage = useRef([
        'Welcome to puzzle CLI mode!',
        'Run "help" to get supported commands list'
    ])
    const ctx = useAppContext();
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const [commands, setCommands] = useState({});

    const handleLevelChanged = useCallback((level: Level) => {

        dispatch(setLevel(level, false));
    }, [dispatch]);

    useEffect(() => {
        setCommands(getCommands(ctx, ref.current, handleLevelChanged));
    }, [ctx, handleLevelChanged]);

    return (
        <Terminal
            welcomeMessage={welcomeMessage.current}
            commands={commands}
            ref={ref}
            style={{minHeight: `${DEFAULT_HEIGHT}px`, maxHeight: `${DEFAULT_HEIGHT}px`}}
            noDefaults
        />);
};

export {
    TerminalComponent as Terminal,
};
