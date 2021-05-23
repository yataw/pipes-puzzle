declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

type ValueOf<T> = T[keyof T];

type ToDo = any;
type NonEmptyArray<T> = [T, ...T[]];

type Level = 1 | 2 | 3 | 4 | 5 | 6;

// to types for this module :(
declare module 'react-console-emulator';
