#!/usr/bin/env node
import path from 'path';
import { cwd } from 'process';

const getPath = (filepath) => {
    return path.resolve(cwd(), filepath);
};

getPath();