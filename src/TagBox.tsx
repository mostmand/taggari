import { Card, Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Highlighter } from "./Highlighter"
import { Tags } from "./Tags";
import { TagSelector } from "./TagSelector";
import { Word } from "./Word";

export const TagBox = () => {
    const createWords = (text: string) => {
        const tokens = text.split(' ');
        return tokens.map(token => {
            return new Word(token);
        });
    };
    const [words, setWords] = useState(new Array<Word>());
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setWords(createWords('salam khoobi chetori'));
        }
        return () => {
            mounted = false
        };
    }, []);

    const wordClicked = (wordNumber: number) => {
        setWords(words => {
            const clonedWords = [...words];
            const word = clonedWords[wordNumber];
            clonedWords[wordNumber] = word.withSelected(!word.selected);
            return clonedWords;
        })
    };

    const highlighters = words.map((word, index) => {
        return <Highlighter key={index} selected={word.selected} onClick={() => wordClicked(index)}>{word.token}</Highlighter>
    });
    return <Container>
        <TagSelector tags={Tags}></TagSelector>
        <Card variant='outlined'>
            {highlighters}
        </Card>
    </Container>;
}