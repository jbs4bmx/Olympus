using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Enums;

namespace MountOlympus.Helpers;

public static class AddStimEffects
{
    

    // Helper Functions
    public static void AddOrUpdateDamageEffects(
        TemplateItem item,
        DamageEffectType type,
        int delayValue,
        int durationValue,
        int fadeoutValue)
    {
        item.Properties!.EffectsDamage![type] = new EffectsDamageProperties
        {
            Delay = delayValue,
            Duration = durationValue,
            FadeOut = fadeoutValue
        };
    }

    public static void AddOrUpdateDamageEffectsWithCost(
        TemplateItem item,
        DamageEffectType type,
        int costValue,
        int delayValue,
        int durationValue,
        int fadeoutValue,
        int minValue,
        int maxValue)
    {
        item.Properties!.EffectsDamage![type] = new EffectsDamageProperties
        {
            Cost = costValue,
            Delay = delayValue,
            Duration = durationValue,
            FadeOut = fadeoutValue,
            HealthPenaltyMin = minValue,
            HealthPenaltyMax = maxValue
        };
    }

    public static void AddOrUpdateHealthEffects(
        TemplateItem item,
        HealthFactor type,
        int effectValue)
    {
        item.Properties!.EffectsHealth![type] = new EffectsHealthProperties
        {
            Value = effectValue
        };
    }

}
