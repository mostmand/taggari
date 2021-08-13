import { AppBar, Container, Paper, Toolbar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { HighlightColors, Highlighter } from "./Highlighter"
import { TagDefinition } from "./TagDefinition";
import { Tags } from "./Tags";
import { Tag, TagSelector } from "./TagSelector";
import { Word } from "./Word";
import { TextArea } from "./TextArea";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { teal } from "@material-ui/core/colors";
import { BottomBar } from "./BottomBar";

const WORD_DELIMITER = ' ';

const useStyles = makeStyles(theme => ({
    tagBar: {
        marginTop: "0.05rem",
        backgroundColor: theme.palette.type === "dark" ? grey[800] : teal[400],
        marginBottom: "0.5rem",
    }
}));

export const TagBox = () => {
    const classes = useStyles();

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
            setWords(createWords('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
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

    const tagSelectedWords = (tagName: string): void => {
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
                    const newWord = new Word(selectedWords.map(w => w.token).join(WORD_DELIMITER), false, tagName);
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

    const clearWord = (index: number): void => {
        setWords(words => {
            const clonedWords = new Array<Word>();
            for (var i = 0; i < words.length; i++) {
                const word = words[i];
                if (i === index) {
                    const splitWords = word.token.split(WORD_DELIMITER).map(token => new Word(token, false));
                    Array.prototype.push.apply(clonedWords, splitWords);
                }
                else {
                    clonedWords.push(word);
                }
            }
            return clonedWords;
        });
    }

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
            onClick={word.tag === undefined ? () => wordClicked(index) : undefined}
            clearable={word.tag !== undefined}
            onClearClicked={() => clearWord(index)}
        >
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
    return <div>
        <React.Fragment>
            <AppBar
                position="sticky"
                className={classes.tagBar}
            >
                <Toolbar>
                    <TagSelector tags={tags}></TagSelector>
                </Toolbar>
            </AppBar>
        </React.Fragment>

        <Container>
            <Paper>
                <TextArea>
                    {highlighters}
                </TextArea>
            </Paper>
            <BottomBar />
        </Container>
    </div>;
}
