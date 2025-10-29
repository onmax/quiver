<template>
  <USeparator class="h-px">
    <template #icon>
      <img
        src="/logo-mono.svg"
        alt="Quiver"
        class="size-6"
      >
    </template>
  </USeparator>

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} Quiver
      </p>
    </template>

    <div class="flex items-center gap-4 text-sm">
      <span class="flex items-center gap-1.5 text-muted">
        <UIcon
          name="i-ph-map-pin-duotone"
          class="size-4"
        />
        <span>Applebys PL. 7, 1411 Copenhagen</span>
      </span>
      <span class="text-muted">CVR: 43956841</span>
    </div>

    <template #right>
      <div class="flex items-center gap-4 text-sm">
        <ULink
          to="mailto:hello@quiver.dk"
          class="flex items-center gap-1.5 text-muted hover:text-default"
        >
          <UIcon
            name="i-ph-envelope-duotone"
            class="size-4"
          />
          <span>hello@quiver.dk</span>
        </ULink>
        <ULink
          to="tel:+4531380423"
          class="flex items-center gap-1.5 text-muted hover:text-default"
        >
          <UIcon
            name="i-ph-phone-duotone"
            class="size-4"
          />
          <span>+45 31 38 04 23</span>
        </ULink>
      </div>
    </template>
  </UFooter>
</template>
