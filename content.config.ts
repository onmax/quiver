import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
})

const createFeatureSchema = () => createBaseSchema().extend({
  icon: z.string().editor({ input: 'icon' }),
  ui: z.object({
    leading: z.string().optional()
  }).editor({ hidden: true })
})

const landingSchema = z.object({
      seo: z.object({
        title: z.string(),
        description: z.string()
      }).optional(),
      hero: z.object({
        image: z.string().optional(),
        links: z.array(createLinkSchema())
      }),
      integrations: z.object({
        logos: z.array(z.object({
          src: z.string(),
          alt: z.string()
        }))
      }).optional(),
      platform_logos: z.object({
        logos: z.array(z.object({
          src: z.string(),
          alt: z.string()
        }))
      }).optional(),
      benefits: z.object({
        cards: z.array(z.object({
          percentage: z.string(),
          title: z.string(),
          icon: z.string().editor({ input: 'icon' }),
          items: z.array(z.string())
        }))
      }).optional(),
      section: createBaseSchema().extend({
        images: z.object({
          mobile: z.string().optional(),
          desktop: z.string().optional()
        }).optional(),
        features: z.array(
          createBaseSchema().extend({
            icon: z.string().editor({ input: 'icon' }).optional(),
            class: z.string().optional()
          })
        )
      }),
      features: createBaseSchema().extend({
        features: z.array(createFeatureSchema())
      }),
      about: createBaseSchema().extend({
        content: z.string().nonempty()
      }).optional(),
      steps: createBaseSchema().extend({
        items: z.array(createBaseSchema().extend({
          icon: z.string().editor({ input: 'icon' }).optional(),
          image: z.object({
            light: z.string().editor({ input: 'media' }),
            dark: z.string().editor({ input: 'media' })
          }).optional()
        }))
      }),
      testimonials: createBaseSchema().extend({
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().optional(),
              avatar: z.object({
                src: z.string().editor({ input: 'media' }),
                alt: z.string().optional()
              }).optional(),
              target: createEnum(['_blank', '_self']).optional()
            })
          }))
      }),
      team: createBaseSchema().extend({
        members: z.array(z.object({
          name: z.string().nonempty(),
          role: z.string().nonempty(),
          bio: z.string().nonempty(),
          image: z.string().editor({ input: 'media' }).optional(),
          linkedin: z.string().optional()
        }))
      }).optional(),
      investors: createBaseSchema().extend({
        members: z.array(z.object({
          name: z.string().nonempty(),
          role: z.string().nonempty(),
          bio: z.string().nonempty(),
          image: z.string().editor({ input: 'media' }),
          linkedin: z.string().optional()
        }))
      }).optional(),
      cta: createBaseSchema().extend({
        links: z.array(createLinkSchema())
      })
    })

export const collections = {
  content: defineCollection({
    source: 'index.yml',
    type: 'page',
    schema: landingSchema
  })
}
