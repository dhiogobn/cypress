const { timeout } = require("async")
const { elementAt } = require("rxjs")
const XLSX = require('xlsx')

const profileUrl = Cypress.env('url')

const loginPage = profileUrl
var title = ''
var subscription = ''
var talkAbout = ''
var city = ''
var follows = ''
var about = ''
var languages = []
var contactInfo = ''
var sites = []
var education = []
var experience = []
var skills = []
var volunteering = []
var licencesAndCertifications = []
var projects = []
var publications = []
var courses = []
var honorsAndAwards = []
var organizations = []

describe('template spec', () => {
  before(() => {
    cy.fixture('../cookies.json').then(cookies => {
      // Configura cada cookie lido
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          path: cookie.path,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          expiry: cookie.expiry
        });
      });
    });
    cy.visit(loginPage, {
      failOnStatusCode: false
    })
  })
  after(() => {
    const userJson =
    {
      "title":title,
      "description":subscription,
      "talkAbout":talkAbout,
      "city":city,
      "follows":follows,
      "about":about,
      "languages":languages,
      "contactInfo":contactInfo,
      "sites":sites,
      "education":education,
      "experience":experience,
      "skills":skills,
      "volunteering":volunteering,
      "licencesAndCertifications":licencesAndCertifications,
      "projects":projects,
      "publications":publications,
      "courses":courses,
      "honorsAndAwards":honorsAndAwards,
      "organizations":organizations
    }
    console.log(userJson)
    document.addEventListener("DOMContentLoaded", function() {
      console.log('entrou no domContentLoaded')
      // Exibir JSON no elemento <pre>
      document.getElementById('json-container').textContent = JSON.stringify(userJson, null, 2);
    })
    generateExcelFile(userJson)
    const jsonContent = JSON.stringify(userJson);
    console.log("jsonContent: ", jsonContent)
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "userJson.json");
    document.body.appendChild(link);

    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(link);

  })
  it('passes', () => {
    cy.visit(profileUrl)
    cy.wait(2000)
    cy.get('.text-heading-xlarge').invoke('text').then((text) => {
      title = text.trim();
      cy.log("titulo: ",title)
    })
    cy.wait(2000)
    cy.get('.text-body-medium').invoke('text').then((text) => {
      subscription = text.trim();
      cy.log("descrição: ", subscription)
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('.relative > :nth-child(1) > .text-body-small > [aria-hidden="true"]').length > 0) {
        cy.get('.relative > :nth-child(1) > .text-body-small > [aria-hidden="true"]').invoke('text').then((text) => {
          talkAbout = text.trim();
          cy.log("fala sobre: ", talkAbout)
        })
      }
    })
    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('.pv-text-details__left-panel.mt2 > .text-body-small').length > 0) {
        cy.get('.pv-text-details__left-panel.mt2 > .text-body-small').invoke('text').then((text) => {
          city = text.trim();
          cy.log("cidade: ", city)
        })
      }
    })


    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('.pv-top-card--list').length > 0) {
        cy.get('.pv-top-card--list').invoke('text').then((text) => {
          follows = text.trim().replace(/\s/g, " ");
          cy.log("Seguidores: ", follows)
        })
      }
    })

    // cy.get('body').then((body) => {
    //   if (body.find(':nth-child(2) > .t-black--light > .t-bold').length > 0) {
    //     cy.get(':nth-child(2) > .t-black--light > .t-bold').invoke('text').then((text) => {
    //       const conections = text.trim();
    //       console.log("conexões: ", conections)
    //     })
    //   }
    // })

    cy.wait(2000)
        // [data-generated-suggestion-target="urn:li:fsu_profileActionDelegate:-1839640498"] > .pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]
    cy.get('body').then((body) => {
      if (body.find('.pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]').length > 0) {
        cy.get('.pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]').then((text) => {
          about = text[0].innerText;
          cy.log("Sobre: ", about)
        })
      }
    })

    //
    // cy.get('body').then((body) => {
    //   if (body.find('#navigation-index-see-all-languages').length > 0) {
    //     cy.wait(2000)
    //     cy.get('#navigation-index-see-all-languages').click()
    //   }
    // })

    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#languages').length > 0) {
        cy.get('#languages').then((text) => {
          const id = text[0].offsetParent.id;
          if (body.find(`#${id}`)) {
            if (cy.get(`#${id}`)) {
              cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                languages.push(removeDuplicates(value[0].innerText.trim()))
                cy.log("languages: ", removeDuplicates(value[0].innerText.trim()))
              })
            }
          }
        })
      }
    })


    cy.wait(2000)
    cy.visit(profileUrl)

    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#top-card-text-details-contact-info').length > 0) {
        cy.get('#top-card-text-details-contact-info').click()
        cy.wait(2000)
      }
    })
    cy.log("informações de contato")

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile)
    // })
    // const cont = 0;
    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('.ci-vanity-url > .pv-contact-info__ci-container').length > 0) {
        cy.get('.ci-vanity-url > .pv-contact-info__ci-container').then((text) =>{
          contactInfo = text[0].innerText
          cy.log("Informação de contato: ", contactInfo)
        })

      }
    })
    cy.wait(2000)
    const array = []
    cy.get('body').then((body) => {
      if (body.find('.ci-websites > .list-style-none').length > 0) {
        cy.get('.ci-websites > .list-style-none').each((site) => {
          if(site[0].children[0].innerText) {
            site.push(site[0].children[0].innerText)
          }
        }).then((site) => {
          site.each((element) => {
            sites.push(site[element].innerText)
            cy.log("site: ", site[element].innerText)
          })
        });
      }
    })
    cy.wait(2000)
    cy.visit(profileUrl)
    cy.wait(2000)

    cy.get('body').then((body) => {
      if(body.find('#education').length > 0) {
        if (cy.get('#education')) {
          cy.get('#education').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  education.push(removeDuplicates(value[0].innerText.trim()))
                  cy.log("education: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })
    cy.wait(2000)
    cy.visit(profileUrl);
    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#experience').length > 0) {
        if(cy.get('#experience')){
          cy.get('#experience').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  experience.push(removeDuplicates(value[0].innerText.trim()))
                  cy.log("Experience: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })
    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#skills').length > 0) {
        if(cy.get('#skills')){
          cy.get('#skills').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  skills.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("skills: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })
    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#volunteering_experience').length > 0) {
        if(cy.get('#volunteering_experience')){
          cy.get('#volunteering_experience').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  volunteering.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("Volunteering experience: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }

      }
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('#licenses_and_certifications').length > 0) {
        if(cy.get('#licenses_and_certifications')){
          cy.get('#licenses_and_certifications').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  licencesAndCertifications.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("licenses and certifications: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('#projects').length > 0) {
        if(cy.get('#projects')){
          cy.get('#projects').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  projects.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("projects: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('#publications').length > 0) {
        if(cy.get('#publications')){
          cy.get('#publications').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  publications.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("publications: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('#courses').length > 0) {
        if(cy.get('#courses')){
          cy.get('#courses').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  courses.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("courses: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })
    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#honors_and_awards').length > 0) {
        if(cy.get('#honors_and_awards')){
          cy.get('#honors_and_awards').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  honorsAndAwards.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("honors and awards: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })

    cy.wait(2000)
    cy.get('body').then((body) => {
      if (body.find('#organizations').length > 0) {
        if(cy.get('#organizations')){
          cy.get('#organizations').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  organizations.push(removeDuplicates(value[0].innerText.trim()))
                  console.log("organizations: ", removeDuplicates(value[0].innerText.trim()))
                })
              }
            }
          })
        }
      }
    })
  })
})

function removeDuplicates(texto) {
  const textNoDuplications = texto
      .split('\n')
      .filter((linha, index, array) => array.indexOf(linha) === index)
      .join('\n');

  return textNoDuplications
}

function generateExcelFile(userJson) {
  const workbook = XLSX.utils.book_new(); // Cria um novo workbook

  // Converte os arrays em objetos com chaves numéricas para que possam ser exibidos corretamente no Excel
  const userJsonArraysFixed = {};
  for (const key in userJson) {
    if (Array.isArray(userJson[key])) {
      for (let i = 0; i < userJson[key].length; i++) {
        const arrayKey = `${key}_${i}`;
        userJsonArraysFixed[arrayKey] = userJson[key][i];
      }
    } else {
      userJsonArraysFixed[key] = userJson[key];
    }
  }

  // Cria uma planilha no workbook
  const worksheet = XLSX.utils.json_to_sheet([userJsonArraysFixed]);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados do Usuário'); // Adiciona a planilha ao workbook

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }); // Converte o workbook para um buffer

  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'userJson.xlsx'; // Nome do arquivo Excel
  link.click();

  URL.revokeObjectURL(url);
}

