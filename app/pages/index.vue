<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const featureTabs = [
  { label: 'Forecasting & demand planning', value: 'forecasting', image: '/landing/features/feature-forecasting.webp', content: 'Leverage AI-powered forecasting models to predict demand with unprecedented accuracy. Turn historical data into actionable insights.' },
  { label: 'Inventory optimization & ordering', value: 'inventory', image: '/landing/features/feature-inventory.webp', content: 'Balance stock levels automatically with intelligent order suggestions. Never run out of stock or tie up cash in excess inventory.' },
  { label: 'Enrich historical and future data', value: 'enrich', image: '/landing/features/feature-enrich-data.webp', content: 'Integrate seasonality, promotions, and market trends seamlessly. Let the system handle routine planning while you focus on strategy.' },
  { label: 'One source for effective planning', value: 'source', image: '/landing/features/feature-one-source.webp', content: 'Unify Sales, Operations, and Finance with a single source of truth. Break down silos and make aligned decisions across teams.' }
]

const selectedTab = ref('forecasting')
const currentImage = computed(() => featureTabs.find(t => t.value === selectedTab.value)?.image || featureTabs[0].image)

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})
</script>

<template>
  <div
    v-if="page"
    class="relative"
  >
    <div class="hidden lg:block">
      <NuxtImg
        src="/images/light/line-1.svg"
        class="absolute pointer-events-none pb-10 left-0 top-32 object-cover h-[650px]"
      />
    </div>

    <UPageHero
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'md:pt-18 lg:pt-20 pb-8 sm:pb-10',
        body: 'mt-4'
      }"
    >
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <MDC
          :value="page.title"
          unwrap="p"
        />
      </template>

      <template #body>
        <div v-if="page.hero?.links" class="flex flex-wrap gap-x-6 gap-y-3">
          <UButton
            v-for="(link, index) in page.hero.links"
            :key="index"
            v-bind="link"
          />
        </div>

        <div
          v-if="page.integrations"
          class="mt-10"
        >
          <p class="text-sm text-muted mb-4">
            Trusted by
          </p>
          <div class="space-y-4">
            <UMarquee
              pause-on-hover
              :ui="{ root: '[--duration:40s] before:w-[10%] after:w-[10%]' }"
            >
              <NuxtImg
                v-for="(logo, index) in page.integrations.logos.slice(0, 7)"
                :key="index"
                :src="logo.src"
                :alt="logo.alt"
                class="h-8 max-w-24 w-auto shrink-0 object-contain"
              />
            </UMarquee>
            <UMarquee
              reverse
              pause-on-hover
              :ui="{ root: '[--duration:40s] before:w-[10%] after:w-[10%]' }"
            >
              <NuxtImg
                v-for="(logo, index) in page.integrations.logos.slice(7)"
                :key="index"
                :src="logo.src"
                :alt="logo.alt"
                class="h-8 max-w-24 w-auto shrink-0 object-contain"
              />
            </UMarquee>
          </div>
        </div>
      </template>

      <NuxtImg
        v-if="page.hero.image"
        :src="page.hero.image"
        :alt="page.title"
      />
    </UPageHero>

    <UPageSection
      v-if="page.benefits"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    >
      <UPageGrid>
        <UPageCard
          v-for="(card, index) in page.benefits.cards"
          :key="index"
          class="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          :ui="{ container: 'p-6', root: 'border-2 border-muted hover:border-primary/30' }"
        >
          <div class="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-0.5">
            <div class="row-span-2 size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <UIcon
                :name="card.icon"
                class="size-8 text-primary"
              />
            </div>
            <div class="text-3xl font-bold text-primary">
              {{ card.percentage }}
            </div>
            <div class="text-xl font-bold">
              {{ card.title }}
            </div>
            <div class="col-span-2 mt-4">
              <ul class="space-y-2 text-muted text-sm">
                <li
                  v-for="(item, i) in card.items"
                  :key="i"
                  class="flex items-start gap-2"
                >
                  <UIcon
                    name="i-ph-check-circle-duotone"
                    class="text-primary shrink-0 size-4 mt-0.5"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.hero_features"
      id="hero-features"
      :title="page.hero_features.title"
      :description="page.hero_features.description"
    >
      <template #title>
        <MDC :value="page.hero_features.title" />
      </template>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div class="space-y-6">
          <UPageCard
            v-for="(feature, index) in page.hero_features.features"
            :key="index"
            :title="feature.title"
            :description="feature.description"
            :ui="{ root: feature.class || '' }"
          />
        </div>
        <div v-if="page.hero_features.images">
          <NuxtImg
            :src="page.hero_features.images.desktop || page.hero_features.images.mobile"
            alt="Platform preview"
            class="w-full"
          />
        </div>
      </div>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.steps"
      id="steps"
      :description="page.steps.description"
      class="relative overflow-hidden"
    >
      <template #headline>
        <NuxtImg
          src="/images/light/line-3.svg"
          class="absolute -top-10 sm:top-0 right-1/2 h-24"
        />
      </template>
      <template #title>
        <MDC :value="page.steps.title" />
      </template>

      <template #features>
        <UPageCard
          v-for="(step, index) in page.steps.items"
          :key="index"
          class="group"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-center gap-1' }"
        >
          <NuxtImg
            v-if="step.image?.light"
            :src="step.image.light"
            :alt="step.title"
            class="size-full"
          />

          <div class="flex flex-col gap-2">
            <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
            <span class="text-sm text-muted">
              {{ step.description }}
            </span>
          </div>
        </UPageCard>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="feature-tabs"
      class="relative overflow-visible bg-muted/20"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20 max-w-none' }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to plan with confidence
          </h2>
          <p class="text-lg text-muted max-w-2xl">
            Purpose-built workflows replace spreadsheets so your team makes faster, smarter inventory decisions.
          </p>
        </div>

        <div class="grid lg:grid-cols-[450px_1fr] gap-8 items-start">
          <div class="space-y-2">
            <button
              v-for="tab in featureTabs"
              :key="tab.value"
              :class="[
                'w-full text-left px-6 py-4 rounded-lg transition-colors',
                selectedTab === tab.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
              ]"
              @click="selectedTab = tab.value"
            >
              <div class="flex flex-col gap-1">
                <span class="font-semibold">{{ tab.label }}</span>
                <span class="text-sm text-muted">{{ tab.content }}</span>
              </div>
            </button>
          </div>

          <div class="relative -mr-4 sm:-mr-6 lg:-mr-8 overflow-visible">
            <NuxtImg
              :src="currentImage"
              alt="Feature preview"
              class="w-full transition-opacity duration-300 rounded-l-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.features"
      id="features"
      :description="page.features.description"
      :features="page.features.features"
      :ui="{
        title: 'text-left @container relative flex',
        description: 'text-left'
      }"
      class="relative overflow-hidden"
    >
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <template #title>
        <MDC
          :value="page.features.title"
          class="*:leading-9"
        />
        <div class="hidden @min-[1020px]:block">
          <NuxtImg
            src="/images/light/line-2.svg"
            class="absolute top-0 right-0 size-full transform scale-95 translate-x-[70%]"
          />
        </div>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.platform_logos"
      id="integrations"
      class="bg-muted/20"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    >
      <div class="text-center mb-10 max-w-3xl mx-auto space-y-3">
        <h2 class="text-3xl sm:text-4xl font-bold">
          <MDC
            :value="page.platform_logos.title"
            unwrap="span"
          />
        </h2>
        <p
          v-if="page.platform_logos.description"
          class="text-lg text-muted"
        >
          {{ page.platform_logos.description }}
        </p>
      </div>

      <UMarquee
        pause-on-hover
        :ui="{ root: '[--duration:30s]' }"
      >
        <NuxtImg
          v-for="(logo, index) in page.platform_logos.logos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="h-12 max-w-48 w-auto shrink-0 object-contain"
        />
      </UMarquee>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.testimonials"
      id="testimonials"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
      :items="page.testimonials.items"
    >
      <template #headline>
        <NuxtImg
          src="/images/light/line-5.svg"
          class="absolute -top-10 sm:top-0 right-1/2 h-24"
        />
      </template>
      <template #title>
        <MDC :value="page.testimonials.title" />
      </template>

      <UContainer>
        <UPageColumns class="xl:columns-3">
          <UPageCard
            v-for="(testimonial, index) in page.testimonials.items"
            :key="index"
            variant="subtle"
            :description="testimonial.quote"
            :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
          >
            <template #footer>
              <UUser
                v-bind="testimonial.user"
                size="xl"
              />
            </template>
          </UPageCard>
        </UPageColumns>
      </UContainer>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden @container"
    >
      <template #title>
        <MDC :value="page.cta.title" />

        <div class="@max-[1280px]:hidden">
          <NuxtImg
            src="/images/light/line-6.svg"
            class="absolute left-10 -top-10 sm:top-0 h-full"
          />
          <NuxtImg
            src="/images/light/line-7.svg"
            class="absolute right-0 bottom-0 h-full"
          />
        </div>
      </template>

      <LazyStarsBg />
    </UPageCTA>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.about"
      id="about"
      class="relative overflow-hidden"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    >
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <MDC
            :value="page.about.title"
            unwrap="p"
          />
        </h2>
        <p class="text-lg text-muted max-w-4xl mx-auto">
          {{ page.about.description }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto mt-16">
        <h3 class="text-2xl sm:text-3xl font-bold mb-6">
          Who we are
        </h3>
        <p class="text-lg text-muted leading-relaxed">
          {{ page.about.content }}
        </p>
      </div>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.team"
      id="team"
      :title="page.team.title"
      :description="page.team.description"
    >
      <template #title>
        <MDC :value="page.team.title" />
      </template>

      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          v-for="(member, index) in page.team.members"
          :key="index"
        >
          <template #header>
            <NuxtImg
              v-if="member.image"
              :src="member.image"
              :alt="member.name"
              class="size-16 rounded-full object-cover outline-2 -outline-offset-2 outline-white/20"
            />
            <div
              v-else
              class="size-16 rounded-full outline-2 -outline-offset-2 outline-white/20"
            />
          </template>

          <template #title>
            <p class="text-sm text-muted">
              {{ member.role }}
            </p>
            <h3 class="text-lg font-semibold">
              {{ member.name }}
            </h3>
          </template>

          <template #description>
            <p class="text-sm text-muted">
              {{ member.bio }}
            </p>
          </template>

          <template #footer>
            <UButton
              v-if="member.linkedin"
              :to="member.linkedin"
              target="_blank"
              variant="link"
              color="neutral"
              icon="i-simple-icons-linkedin"
              aria-label="LinkedIn"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="page.investors"
      id="investors"
      :title="page.investors.title"
      :description="page.investors.description"
    >
      <template #title>
        <MDC :value="page.investors.title" />
      </template>

      <UPageGrid class="lg:grid-cols-5">
        <UPageCard
          v-for="(member, index) in page.investors.members"
          :key="index"
        >
          <template #header>
            <NuxtImg
              :src="member.image"
              :alt="member.name"
              class="size-16 rounded-full object-cover outline-2 -outline-offset-2 outline-white/20"
            />
          </template>

          <template #title>
            <p class="text-sm text-muted">
              {{ member.role }}
            </p>
            <h3 class="text-lg font-semibold">
              {{ member.name }}
            </h3>
          </template>

          <template #description>
            <p class="text-sm text-muted">
              {{ member.bio }}
            </p>
          </template>

          <template #footer>
            <UButton
              v-if="member.linkedin"
              :to="member.linkedin"
              target="_blank"
              variant="link"
              color="neutral"
              icon="i-simple-icons-linkedin"
              aria-label="LinkedIn"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>
