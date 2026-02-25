import { describe, test } from "@jest/globals"

// TODO: Implement tests

describe('User Route Tests', () => {

    describe('/users', () => {
        describe('GET', () => {
            describe('Positive Cases', () => {
                test('placeholder', () => {
                    // expect(true).toBe(true); // Placeholder test

                    var resp = globalThis.__DATABASE__.selectFrom('user_profiles').execute().then(users => {
                        console.log('Users from database:', users);
                    })
                    
                    expect(resp).resolves.toBeDefined();
                })
            })

            describe('Negative Cases', () => {
                //tests
            })
        })

        describe('POST', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })
    })

    describe('/users/:id', () => {
        describe('GET', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })

        describe('PUT', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })

        describe('DELETE', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })
    })

    describe('/users/:id/followers', () => {
        describe('GET', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })
    })

    describe('/users/:id/following', () => {
        describe('GET', () => {
            describe('Positive Cases', () => {
                //tests
            })

            describe('Negative Cases', () => {
                //tests
            })
        })
    })
})