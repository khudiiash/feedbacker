//  Format:
//       keyword: [
//                 [
//                 "recommendation 1",
//                 "recommendation 2",
//                 "recommendation 3"
//                 ],
//                 points to take  
//             ]

let issues = {
    content: {
        'incomplete': [
            ['You did not cover all the points required in the order instructions.',
            'The text does not meet all the requirements.',
            'The paper does not cover all the necessary points.'], 
            5 ],
        'general' : ['The content is too general and unfocused.','Unfortunately, it does not have a focus. You should have provided more specific details.','I expected more specific analysis of the topic. Your work is excessively superficial'],
    },
    structure: {
        'no structure': ['You do not have correct essay structure that requires having an introduction, body, and conclusion.'],
        'no introduction': ['You do not have an introduction in this paper.' ],
        'no conclusion': ['You do not have a conclusion in this paper.' ],
        'introductory sentence': ['Your introductory sentence could be better. It must give the reader a clue of the topic and catch attention.' ],
        'topic sentence': ['Each paragraph must begin with a topic sentence that would present its main point.' ],
        'concluding sentence': ['At the end of each paragraph, you should provide a concluding sentence summarizing the main findings and transiting to the next paragraph.' ],
    },
    grammar: {
        'spelling': ['You have many spelling issues. Please, enable the in-built spellchecking feature most probably available in your editor' ],
        'word order': ['Word order is often incorrect' ],
        'subject-verb': ['You often violate subject-verb agreement.' ],
    }
}

export default issues