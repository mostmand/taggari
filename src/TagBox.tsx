import { Card, Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import { HighlightColors, Highlighter } from "./Highlighter"
import { TagDefinition } from "./TagDefinition";
import { Tags } from "./Tags";
import { Tag, TagSelector } from "./TagSelector";
import { Word } from "./Word";

export const TagBox = () => {
    const tagsByName = new Map<string, TagDefinition>();
    Tags.forEach(tag => tagsByName.set(tag.name, tag));

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

    const tagSelectedWords = (tagName: string) => {
        setWords(words => {
            var found = false;
            var done = false;
            const selectedWords = new Array<Word>();
            const clonedWords = new Array<Word>();
            for (var i = 0; i < words.length; i++) {
                const word = words[i];
                if (done === true) {
                    clonedWords.push(word);
                    continue;
                }
                if (word.selected === true) {
                    found = true;
                    selectedWords.push(word);
                }
                else if (found === true) {
                    const newWord = new Word(selectedWords.map(w => w.token).join(' '), false, tagName);
                    clonedWords.push(newWord);
                    done = true;
                    clonedWords.push(word);
                }
                else {
                    clonedWords.push(word);
                }
            }
            if (done !== true && selectedWords.length !== 0) {
                const newWord = new Word(selectedWords.map(w => w.token).join(' '), false, tagName);
                clonedWords.push(newWord);
            }
            return clonedWords;
        });
    };

    const getHighlightColors = (tagName?: string): HighlightColors | undefined => {
        if (tagName === undefined) {
            return undefined;
        }
        const tag = tagsByName.get(tagName);
        const highlightColors: HighlightColors = {
            backgroundColorDark: tag!.colors.backgroundColorDark,
            backgroundColorLight: tag!.colors.backgroundColorLight,
            textColorDark: tag!.colors.textColorDark,
            textColorLight: tag!.colors.textColorLight
        };
        return highlightColors;
    };

    const highlighters = words.map((word, index) => {
        return <Highlighter key={index}
            selected={word.selected || word.tag !== undefined}
            highlight={getHighlightColors(word.tag)}
            onClick={word.tag === undefined ? () => wordClicked(index) : undefined}>
            {word.token}
        </Highlighter>
    });

    const tags: Tag[] = Tags.map(tag => {
        return {
            name: tag.name,
            buttonColor: tag.colors.buttonColor,
            onClick: () => {
                tagSelectedWords(tag.name);
            }
        };
    });
    return <Container>
        <TagSelector tags={tags}></TagSelector>
        <Card variant='outlined'>
            {highlighters}
        </Card>
    </Container>;
}